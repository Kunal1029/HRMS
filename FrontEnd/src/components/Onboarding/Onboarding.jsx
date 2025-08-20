import React from 'react'
import "./Onboarding.css"
import OnboardingText from './OnboardingText'
function Onboarding() {
  return (
    <div className='dash-box'>
      <div className="dash-rect">
        <img src="/dashBoardImage.png" className='dash-img' alt="" />

        <div className="dash-content">
            <OnboardingText />
        </div>
      </div>
    </div>
  )
}

export default Onboarding
