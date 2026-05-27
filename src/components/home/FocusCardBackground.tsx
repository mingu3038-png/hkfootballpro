import type { CSSProperties } from 'react';

const PARTICLE_COUNT = 20;

export function FocusCardBackground() {
  return (
    <div className="today-free-focus__bg" aria-hidden>
      <div className="today-free-focus__bg-inner">
        <div className="today-free-focus__pitch" />
        <div className="today-free-focus__stadium-beam today-free-focus__stadium-beam--1" />
        <div className="today-free-focus__stadium-beam today-free-focus__stadium-beam--2" />
        <div className="today-free-focus__stadium-beam today-free-focus__stadium-beam--3" />
        <div className="today-free-focus__spotlight today-free-focus__spotlight--left" />
        <div className="today-free-focus__spotlight today-free-focus__spotlight--center" />
        <div className="today-free-focus__spotlight today-free-focus__spotlight--right" />
        <div className="today-free-focus__spotlight today-free-focus__spotlight--gold" />
        <div className="today-free-focus__red-flare" />
        <div className="today-free-focus__smoke today-free-focus__smoke--a" />
        <div className="today-free-focus__smoke today-free-focus__smoke--b" />
        <div className="today-free-focus__red-mist" />
        <div className="today-free-focus__particles">
          {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
            <span
              key={i}
              className="today-free-focus__particle"
              style={{ '--i': i } as CSSProperties}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
