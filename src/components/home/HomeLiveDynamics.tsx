interface HomeLiveDynamicsProps {
  items: readonly string[];
}

/** 手机端首页 · 临场动态横滑条（桌面不展示，见 globals.css） */
export function HomeLiveDynamics({ items }: HomeLiveDynamicsProps) {
  return (
    <section className="home-live-dynamics" aria-labelledby="home-live-dynamics-title">
      <div className="home-page__container home-live-dynamics__inner">
        <h2 id="home-live-dynamics-title" className="home-live-dynamics__title">
          临场动态
        </h2>
        <div
          className="home-live-dynamics__rail"
          role="list"
          aria-label="临场动态列表"
        >
          {items.map((text) => (
            <p key={text} className="home-live-dynamics__chip" role="listitem">
              {text}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
