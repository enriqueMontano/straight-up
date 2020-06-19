function EnemyFactory(ctx, posX, type) {
    return type === 'easy' ? new EasyEnemy(ctx, 32, 32, posX, 0, 4) :
        type === 'normal' ? new NormalEnemy(ctx, 64, 32, posX, 0, 6) :
            new HardEnemy(ctx, 64, 64, posX, 0, 7)
}

