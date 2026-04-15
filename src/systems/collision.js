export function bullet_with_asteroid(bullet, asteroid) {
    const x_ast = asteroid.x;
    const y_ast = asteroid.y;
    const x_bul = bullet.x;
    const y_bul = bullet.y;
    const ast_radius = asteroid.radius;
    const offset = bullet.pixelSize * 1.5;
    const corners = [
      { x: x_bul - offset, y: y_bul - offset },
      { x: x_bul + offset, y: y_bul - offset },
      { x: x_bul - offset, y: y_bul + offset },
      { x: x_bul + offset, y: y_bul + offset },
    ];
    for(const corner of corners) {
      const dx = corner.x - x_ast;
      const dy = corner.y - y_ast;
      if (dx * dx + dy * dy <= ast_radius * ast_radius) {
        return true;
      }
    }
    return false;
}

export function ship_with_asteroid(ship, asteroid) {
    const x_ast = asteroid.x;
    const y_ast = asteroid.y;
    const x_ship = ship.x;
    const y_ship = ship.y;
    const ast_radius = asteroid.radius;
    const ship_radius = ship.radius;
    const dx = x_ship - x_ast;
    const dy = y_ship - y_ast;
    return dx * dx + dy * dy <= (ast_radius + ship_radius) * (ast_radius + ship_radius);
}