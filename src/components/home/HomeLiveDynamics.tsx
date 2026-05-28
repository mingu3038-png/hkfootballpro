/** 手机端首页 · 临场动态横滑条（桌面不展示，见 globals.css） */
const HOME_LIVE_DYNAMICS_ITEMS = [
  '🔥 曼联盘口持续升温',
  '⚠️ 临场方向 30 分钟前更新',
  '📊 今日精选 3 场重心',
  '🎯 TG 已开放今晚免费场',
] as const;

export function HomeLiveDynamics() {
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
          {HOME_LIVE_DYNAMICS_ITEMS.map((text) => (
            <p key={text} className="home-live-dynamics__chip" role="listitem">
              {text}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
