function EnemyFactory(ctx, x, type) {
  return type === 'easy'
    ? new EasyEnemy(ctx, 32, 32, x, 0, 4)
    : type === 'normal'
    ? new NormalEnemy(ctx, 64, 32, x, 0, 6)
    : new HardEnemy(ctx, 64, 64, x, 0, 7)
}
