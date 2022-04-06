import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch, useLocation } from "react-router-dom";
import SignIn from "./components/Auth/SignIn/SignIn";
import SignUp from "./components/Auth/SignUp/SignUp";
import DashboardContent from "./components/Dashboard/Index";
import Home from "./components/Dashboard/Home/Home";
import Activation from "./components/Dashboard/Activation/Activation";
import Customers from "./components/Dashboard/Customers/Customers";
import Services from "./components/Dashboard/Services/Services";
import Invoices from "./components/Dashboard/Invoices/Invoices";
import Quotations from "./components/Dashboard/Quotations/Quotations";
import Profile from "./components/Dashboard/Profile/Profile";
import CreateInvoice from "./components/Dashboard/invoice/createInvoice";
import ViewInvoice from "./components/Dashboard/invoice/viewInvoice";
import CreateQuotation from "./components/Dashboard/quotation/createQuotation";
import ViewQuotation from "./components/Dashboard/quotation/viewQuotation";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
// import { BrowserRouter, Route, Switch,useLocation } from 'react-router-dom';

const App = () => {
  // const [toggleDark, settoggleDark] =React.useState(true);
  const myTheme = createTheme({
    // Theme settings
    palette: {
      type: "light",
      primary: {
        main: "#fbc86c",
      },
      secondary: {
        main: "#c38206",
      },
      text: {
        primary: "#333",
        secondary: "#333",
        disabled: "#808080",
        hint: "rgba(255, 255, 255, 0.5)",
        icon: "#fbc86c",
        black: '#333',
        color2:'#333'
      },
      background: {
        paper: "#f3f3f3",
        default: "#fffff",
      },
    },
  });

  const location = useLocation()
  React.useEffect(() => {

    if (location.pathname.includes("/dashboard/quotation/") || location.pathname.includes("/dashboard/invoice/")   ) {
      console.log('booking', location.pathname)
      document.querySelector('meta[name="viewport"]').setAttribute("content", "width=1024");
      
      // document.getElementsByTagName('meta')[1].content = "width=1024";

    } else {
      console.log('not booking', location.pathname)
      document.querySelector('meta[name="viewport"]').setAttribute("content", "width=device-width");
      // document.getElementsByTagName('meta')[1].content = "width=device-width";
    }
  }, [location])
  

  return (
    <ThemeProvider theme={myTheme}>
      <Switch>
        <Route path="/signin" component={SignIn} exact />
        <Route path="/signUp" component={SignUp} />
        <Route
          exact
          path="/authentication/activate/:id"
          component={Activation}
        />

        <DashboardContent>
          <Route path="/" component={Home} exact />
          <Route path="/dashboard" component={Home} exact />
          <Route path="/dashboard/profile" component={Profile} />
          <Route path="/dashboard/customers" component={Customers} />
          <Route path="/dashboard/services" component={Services} />
          <Route path="/dashboard/invoices" component={Invoices} />
          <Route path="/dashboard/quotations" component={Quotations} />
          <Route
            exact
            path="/dashboard/creatInvoice"
            component={CreateInvoice}
          />
          <Route  path="/dashboard/invoice/:id" component={ViewInvoice} />
          <Route
            exact
            path="/dashboard/createQuotation"
            component={CreateQuotation}
          />
          <Route
          
            path="/dashboard/quotation/:id"
            component={ViewQuotation}
          />
        </DashboardContent>
      </Switch>
    </ThemeProvider>
  );
};

export default App;

const HomeNew = ({ children }) => {
  return <div>{children}</div>;
};
