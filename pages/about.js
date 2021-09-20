import React from 'react'

const About = () => {
  return (
    <div className='about'>
      <p>You can see more about this project in my LinkedIn post:</p>

      <a
        href='https://www.linkedin.com/posts/kelvin-de-miranda-barros_desenvolvimento-app-fullstack-activity-6844336131853586433-N12T'
        target='_blank'
      >LinkedIn</a>

      <style jsx>{`
        .about {
          display: flex;
          flex: 1;
          flex-direction: column;
          height: 100%;
          align-items: center;
          justify-content: center;
          margin: 200px 30px 50px;
        }

        .about a {
          margin-top: 20px;
          color: var( --linkcolor );
        }
      `}</style>
    </div>
  );
}

export default About;
