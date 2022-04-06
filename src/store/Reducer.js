const reducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
    case "SIGNIN":
      console.log(action.payload);
      return {
        ...state,
        user: action.payload.user,
        asscessToken: action.payload.asscessToken,
        isSignIn: true
      };
    case "SIGNOUT":
      console.log(action.payload);
      return {
        ...state,
        user: [],
        asscessToken: [],
        customer: [],
        services: [],
        company:[],
        inv:[],
        isSignIn: false
      };
    case "GETCOMPANY":
      return {
        ...state,
        company: action.payload
      }
    case "COMPANYCREATED":
      console.log(state.company, action.payload)
      let newCompany = action.payload
      return {
        ...state,
        company: newCompany,
      };

    case "ADDUSER":
      return {
        ...state,
        users: [...state.users, action.payload.sucess],
      };
    case "GETCUSTOMER":
      return {
        ...state,
        customer: action.payload
      }
    case "ADDCUSTOMER":
      return {
        ...state,
        customer: Array.isArray(state.customer)?[...state.customer, action.payload.sucess]:[action.payload.sucess],
      }
    case "UPDATECUSTOMER":
      // let update = state.customer.map((data) => {
      //   if (data._id === action.payload._id) {
      //     return action.payload;
      //   } else {
      //     return data;
      //   }
      // })
      return {
        ...state,
        customer: [...state.customer.map((data) => {
          if (data._id === action.payload._id) {
            return action.payload;
          } else {
            return data;
          }
        })],
      }
      case "UPDATECOMPANY":
        return {
          ...state,
          company: [...state.company.map((data) => {
            if (data._id === action.payload._id) {
              return action.payload;
            } else {
              return data;
            }
          })],
        }

    case "GETPRODUCT":
      return {
        ...state,
        services: action.payload
      }
    case "ADDPRODUCT":
      let newServices = state.services
      newServices.push(action.payload.sucess)
      return {
        ...state,
        services: newServices
      }
    case "UPDATEPRODUCT":
      let updateService = state.services.map((data) => {
        if (data._id === action.payload._id) {
          return action.payload;
        } else {
          return data;
        }
      })
      return {
        ...state,
        services: updateService
      }
    case "INVOICECREATED":
      let newInv = state.inv
      newInv.push(action.payload.sucess)
      return {
        ...state,
        inv: newInv
      }
    
    case "GETINVOICES":
      return {
        ...state,
        inv: action.payload
      }
      case "getQuotations":
      return {
        ...state,
        qout: action.payload
      }
      case "QUOTATIONCREATED":
      let newqout = state.qout
      newqout.push(action.payload.sucess)
      return {
        ...state,
        qout: newqout
      }
      case "MARKASPAID":
      return {
        ...state,
        inv: [...state.inv.map((a)=>{
          if(a._id === action.payload._id){
            return action.payload
          }
          return a
        })]
      }
  };
};

export default reducer;
// QUOTATIONCREATED