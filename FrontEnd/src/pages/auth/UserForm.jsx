import Onboarding from '../../components/Onboarding/Onboarding'
import Logo from '../../components/logo/Logo'
import Register from './Register'
import "./auth.css"

function UserForm() {
  return (
    <>
    <div className="">
      <Logo />
    </div>
    <div className='dash-form'>
      <Onboarding />
      <Register />
    </div>
    </>
  )
}

export default UserForm
