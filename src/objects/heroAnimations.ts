const makeWalkingFrames = (rootFrame: number = 0) => {
  return {
    duration: 400,
    frames: [
      {
        time: 0,
        frame: rootFrame + 1
      },
      {
        time: 100,
        frame: rootFrame
      },
      {
        time: 200,
        frame: rootFrame + 1
      },
      {
        time: 300,
        frame: rootFrame + 2
      }
    ]
  };
};

export const WALK_DOWN = makeWalkingFrames(0);
export const WALK_RIGHT = makeWalkingFrames(3);
export const WALK_UP = makeWalkingFrames(6);
export const WALK_LEFT = makeWalkingFrames(9);
