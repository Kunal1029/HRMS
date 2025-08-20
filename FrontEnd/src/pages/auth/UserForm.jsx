import { Suspense, useEffect, lazy } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Onboarding from "../../components/Onboarding/Onboarding";
import Logo from "../../components/logo/Logo";
import { selectFormType, setFormType } from "../../redux/slices/helperSlice";

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
    <>
      <div>
        <Logo />
      </div>

      <div className="dash-form">
        <Onboarding />
        <Suspense fallback={<div>Loading...</div>}>
          {formType === "login" ? <Login /> : <Register />}
        </Suspense>
      </div>
    </>
  );
}

export default UserForm;
