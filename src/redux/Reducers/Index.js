// let initState = {};

// export const UserReducer = (state = initState, action) => {
//   const { type, payload } = action; //object destructring
//   switch (type) {
//     case "GETUSER":
//       return {
//         ...state,
//         GetUserAll: payload,
//       };
//     case "USER_REWARD":
      
//       return {
//         ...state,
//         reward: payload,
//       };

//     default:
//       return state;
//   }
// };


let initState = {};

export const UserReducer = (state = initState, action) => {
  const { type, payload } = action; //object destructring
  switch (type) {
    case "ADD_USER":
      return {
        ...state,
        user: payload,
      };
    case "REMOVE_USER":
      return {
        ...state,
        user: payload,
      };

    default:
      return state;
  }
};