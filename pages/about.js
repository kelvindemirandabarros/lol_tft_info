import React from 'react'

const About = () => {
  return (
    <div className='about'>
      <p>
        You can see more about this project on my post in LinkedIn:
      </p>
      <a 
        href='https://www.linkedin.com/in/'
        target='_blank'
      >https://www.linkedin.com/in/</a>

      <style jsx>{`
        .about {
          display: flex;
          flex: 1;
          flex-direction: column;
          height: 100%;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  );
}

export default About;
