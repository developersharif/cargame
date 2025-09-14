import { describe, expect, it } from 'vitest';
import { ObjectPool } from '../src/lib/utils/ResourceManager';

describe('ObjectPool', () => {
  it('reuses released objects', () => {
    let created = 0;
    const pool = new ObjectPool(() => ({ id: ++created }));
    const a = pool.acquire();
    pool.release(a);
    const b = pool.acquire();
    expect(b).toBe(a);
    expect(created).toBe(1);
  });
});
