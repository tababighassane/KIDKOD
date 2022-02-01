import React, { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import axios from "axios";
import Drag from "./Drag.jsx";
import WinAnimation from "./winAndLooseAnimation/WinAnimation.jsx";
import LooseAnimation from "./winAndLooseAnimation/LooseAnimation.jsx";

const DropArea = ({ user, setUser, close }) => {
  const [challengeData, setchallengeData] = useState([
    { choices: [], equation: "" },
  ]);
  const [index, setIndex] = useState(0);
  const [choices, setchoices] = useState(challengeData[index].choices);
  const [equation, setequation] = useState(challengeData[index].equation);
  const [responce, setresponce] = useState([]);
  const [goal, setGoal] = useState(false);
  const [challengeResponce, setchallengeResponce] = useState([]);
  const [submitFlag, setsubmitFlag] = useState(false);
  const [handAnimation, sethandAnimation] = useState(true);
  const [view, setview] = useState({
    challenge: true,
    win: false,
    loose: false,
  });

  useEffect(() => {
    axios.get("http://localhost:8000/api/dndChallenge/1").then(({ data }) => {
      setchallengeData(data.challengeData);
      setchoices(data.challengeData[index].choices);
      setequation(data.challengeData[index].equation);
    });
    stopHandAnimation();
  }, []);

  const stopHandAnimation = () => {
    console.log("wait 3 sec");
    setTimeout(() => {
      console.log("done");
      sethandAnimation(false);
    }, 17500);
  };

  const handelGoalClick = () => {
    setGoal(!goal);
    console.log(goal);
  };

  const passeToNext = () => {
    if (index < challengeData.length - 1) {
      setIndex(index + 1);
      setchoices(challengeData[index + 1].choices);
      setequation(challengeData[index + 1].equation);
      setresponce([]);
    }
    console.log("challengeResponce", challengeResponce);
    if (challengeResponce.length < challengeData.length) {
      if (responce[0]) {
        setchallengeResponce([
          ...challengeResponce,
          responce[0].name === challengeData[index].correct,
        ]);
      } else {
        setchallengeResponce([...challengeResponce, false]);
      }
    }

    if (challengeResponce.length === challengeData.length) setsubmitFlag(true);
  };

  const submitResponce = () => {
    let test = challengeResponce.reduce((acc, ele) => (ele ? acc + 1 : acc), 0);
    console.log(test);
    if (test > 3) {
      setview({
        challenge: false,
        win: true,
        loose: false,
      });
      setUser({ ...user, level: user.level + 1 });
      axios
        .put(`http://localhost:8000/api/users/updateLevel/${user._id}`, {
          level: user.level + 1,
        })
        .then(({ data }) => {
          console.log(data.level);
        })
        .catch((err) => console.log(err));
    } else {
      setview({
        challenge: false,
        win: false,
        loose: true,
      });
    }
  };

	const [{ isOver }, dropRef] = useDrop({
		accept: "drag",
		drop: (item) => {
			setresponce([]);
			let ids = choices.map((choice) => choice.id);
			if (!ids.includes(item.id)) setchoices([...choices, item]);
			console.log("hhhhh");
		},
		collect: (monitor) => ({
			isOver: monitor.isOver(),
		}),
	});
	const [{ isOver2 }, dropRef2] = useDrop({
		accept: "drag",
		drop: (item) => {
			if (responce.length === 0) {
				setresponce([...responce, item]);
				setchoices(choices.filter((rest) => item.name !== rest.name));
			}
		},
		collect: (monitor) => ({
			isOver2: monitor.isOver(),
		}),
	});
	return (
		<React.Fragment>
			{view.challenge ? (
				<div className='dnd-container'>
					{handAnimation && (
						<div className='hand-animation'>
							<video
								src='/src/components/static/edited.mp4'
								type='video/mp4'
								// autoPlay='autoplay'
								loop='loop'
								muted='true'
								controls
							>
							</video>
						</div>
					)}
					<div className='icons'>
						<img
							className='challenge-goal icon'
							src='https://cdn3d.iconscout.com/3d/premium/thumb/down-arrow-2871138-2384397.png'
							onClick={handelGoalClick}
						/>
						<img
							className='challenge-close icon'
							src='https://cdn3d.iconscout.com/3d/premium/thumb/close-4112733-3408782@0.png'
							onClick={close}
						/>
					</div>
					{goal && (
						<div className='goal-text'>
							Your child begins by understanding that 'add'
							'substract' ... means to combine two groups of
							objects. Children will soon learn to pair numbers
							that sum to to 5, then 10, and upwards from there.
							These are called number bonds and are very important
							because larger calculations usually depend on being
							fluent with them.
						</div>
					)}
					<div className='switch-question-container'>
						<div className='dnd-sub-container'>
							<div className='question-and-responce'>
								<div className='question'>
									Which is the missing number ?
								</div>
								<div className='responce'>
									<div className='responce-detail'>
										{equation}
									</div>
									<div
										className='choices single'
										ref={dropRef2}
									>
										{responce.map((pet, index) => (
											<Drag
												draggable
												id={pet.id}
												key={index}
												name={pet.name}
											/>
										))}
										{isOver2 && (
											<div className='drop-here'>
												Drop Here!
											</div>
										)}
									</div>
								</div>
							</div>
							<div className='choices multiple' ref={dropRef}>
								{choices.map((pet, index) => (
									<Drag
										draggable
										id={pet.id}
										key={index}
										name={pet.name}
									/>
								))}
							</div>
							{submitFlag && (
								<div className='submit-btn'>
									<button onClick={submitResponce}>
										Submit
									</button>
								</div>
							)}
						</div>
						{!submitFlag && (
							<img
								src='https://cdn3d.iconscout.com/3d/premium/thumb/right-arrow-3711690-3105412.png'
								className='challenge-arrow right-arrow'
								onClick={passeToNext}
							/>
						)}
					</div>
				</div>
			) : (
				<div>
					<div>
						{view.loose && (
							<div className='dnd-container'>
								<video
									className='looseVideo'
									loading='lazy'
									muted='muted'
									src='https://cdnl.iconscout.com/lottie/premium/thumb/oops-3853513-3198274.mp4'
									width='174.6'
									height='174.6'
									type='video/mp4'
									autoplay='autoplay'
									loop='loop'
								></video>
								{/* <LooseAnimation /> */}
								{/* <img
                  className="challenge-close icon"
                  src="https://cdn3d.iconscout.com/3d/premium/thumb/close-4112733-3408782@0.png"
                  onClick={close}
                /> */}

                <ul className="resultList">
                  {challengeResponce.map((e, i) => (
                    <li key={i} className={e ? "correct" : "wrong"}>
                      question {i + 1} is {e && "correct"} {!e && "wrong"}{" "}
                    </li>
                  ))}
                  <li>{true}</li>
                </ul>
                <button onClick={close} className="closeBTN">
                  Close
                </button>
              </div>
            )}
          </div>
          <div>
            {view.win && (
              <div className="dnd-container">
                <h4>Challenge Successfully passed</h4>
                <video
                  className="winVideo"
                  loading="lazy"
                  muted="muted"
                  src="https://cdnl.iconscout.com/lottie/premium/thumb/congratulations-4156453-3444583.mp4"
                  width="441.0714285714285"
                  height="264.6428571428571"
                  type="video/mp4"
                  autoplay="autoplay"
                  loop="loop"
                ></video>{" "}
                <button onClick={close} className="closeBTN">
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default DropArea;
