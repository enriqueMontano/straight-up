function EnemyFactory(ctx, x, type) {
  if (type === 'easy') {
    return new EasyEnemy(ctx, 32, 32, x, 0, 4);
  }
  if (type === 'normal') {
    return new NormalEnemy(ctx, 64, 32, x, 0, 6);
  }
  if (type === 'hard') {
    return new HardEnemy(ctx, 64, 64, x, 0, 7);
  }
}

function CloudFactory(ctx, type) {
  if (type === 'mid') {
    return new MidCloud(ctx, 512, 206, 6);
  }
  if (type === 'high') {
    return new HighCloud(ctx, 1024, 412, 12);
  }
}
