import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import styled from 'styled-components';

// https://codepen.io/GreenSock/pen/eYdyVVe

const StyledLoader = styled.div`
  background-color: var(--dark-navy);
  z-index: 99;
  overflow: hidden;
  height: 100vh;
  overflow: hidden;

  .logo-wrapper {
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    transition: var(--transition);
    opacity: ${props => (props.isMounted ? 1 : 0)};
  }

  .letter {
    text-align: center;
    color: black;
    font-size: 6vmax;
    font-weight: 400;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px 6px;
  }

  .for,
  .gsap {
    font-size: 5vmax;
    color: var(--white);
  }

  .for {
    padding: 2px 1.6vmax;
    font-weight: 300;
    display: none;
  }

  .gsap {
    padding: 2px 0;
    font-weight: 600;
    display: none;
  }

  .logo-wrapper.final .for,
  .logo-wrapper.final .gsap {
    display: block;
  }

  .F {
    background: var(--green);
  }
  .l {
    background: var(--blue);
  }
  .i {
    background: var(--pink);
  }

  .logo-wrapper.plain .letter {
    background: transparent;
    color: var(--white);
    padding: 0;
  }
`;

const Loader = ({ finishLoading }) => {
  const containerRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  const [animationsCompleted, setAnimationsCompleted] = useState(0);

  gsap.registerPlugin(Flip);

  const layouts = ['plain', 'final'];
  // const  container = document.querySelector(".logo-wrapper"),
  let curLayout = 0;

  function nextState() {
    // capture current state
    const state = Flip.getState('.letter, .for, .gsap', {
      props: 'color,backgroundColor',
      simple: true,
    });

    const container = containerRef.current;

    if (!container) {
      // console.error('Container not found');
      return;
    }

    // remove old class
    container.classList.remove(layouts[curLayout]);
    // increment (loop back to the start if at the end)
    curLayout = (curLayout + 1) % layouts.length;
    // add the new class
    container.classList.add(layouts[curLayout]);

    // animate from the previous state
    Flip.from(state, {
      absolute: true,
      stagger: 0.07,
      duration: 0.7,
      ease: 'power2.inOut',
      spin: curLayout === 0, // only spin when going to the "final" layout
      simple: true,
      onEnter: (elements, animation) =>
        gsap.fromTo(elements, { opacity: 0 }, { opacity: 1, delay: animation.duration() - 0.1 }),
      onLeave: elements => gsap.to(elements, { opacity: 0 }),
    });

    // gsap.delayedCall(curLayout === 0 ? 2.5 : 1.5, nextState);

    gsap.delayedCall(curLayout === 0 ? 3.5 : 1.5, () => {
      nextState();
      if (curLayout === 1) {
        setAnimationsCompleted(prev => prev + 1);
      }
    });
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsMounted(true);
    }, 10);
    gsap.delayedCall(1, nextState);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (animationsCompleted === 2) {
      finishLoading();
    }
  }, [animationsCompleted]);

  return (
    <StyledLoader className="loader" isMounted={isMounted}>
      <Helmet bodyAttributes={{ class: `hidden` }} />
      <div ref={containerRef} className="logo-wrapper plain">
        <div className="letter F">M</div>
        <div className="letter l">H</div>
        <div className="letter i">H</div>
        <div className="for"> M </div>
        <div className="gsap">Hemel Hasan</div>
      </div>
    </StyledLoader>
  );
};

Loader.propTypes = {
  finishLoading: PropTypes.func.isRequired,
};

export default Loader;
