import React from 'react'

const About = () => {
  return (
    <div className='about'>
      <p>You can see more about this project in my LinkedIn post:</p>
      <a 
        href='https://www.linkedin.com/in/'
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
          margin: 50px 0px;
          padding: 0px 30px;
        }

        .about a {
          color: #00ccff;
        }
      `}</style>
    </div>
  );
}

export default About;
