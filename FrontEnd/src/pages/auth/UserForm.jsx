import { Suspense, useEffect, lazy } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Onboarding from "../../components/Onboarding/Onboarding";
import Logo from "../../components/logo/Logo";
import { selectFormType, setFormType } from "../../redux/slices/helperSlice";
import Fallback from "../../components/common/Fallback";

const Login = lazy(() => import("./Login"));
const Register = lazy(() => import("./Register"));

function UserForm() {
  const { formType: urlFormType } = useParams();

  const dispatch = useDispatch();
  const formType = useSelector(selectFormType);

  useEffect(() => {
    if (urlFormType === "login" || urlFormType === "register") {
      dispatch(setFormType(urlFormType));
    }
  }, [urlFormType, dispatch]);

  return (
    <div className="" style={{padding: "2rem"}}>
      <div>
        <Logo />
      </div>

      <div className="dash-form">
        
        <Suspense fallback={<Fallback/>}>
        <Onboarding />
          {formType === "login" ? <Login /> : <Register />}
        </Suspense>
      </div>
    </div>
  );
}

export default UserForm;
