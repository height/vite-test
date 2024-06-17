import store from 'store2';

/* 设置缓存数据 */
export function setCache(key: string, value: any, expireMinutes?: number) {
  let data: { value: any; expireAt?: number } = { value };

  if (expireMinutes !== undefined && expireMinutes !== null) {
    const expireAt = Date.now() + expireMinutes * 60 * 1000; // 计算过期时间的时间戳
    data.expireAt = expireAt;
  }

  store.set(key, data);
}

/* 获取缓存数据 */
export function getCache(key: string) {
  const data = store.get(key);
  if (!data) {
    return null;
  }

  // 检查是否设置了过期时间并且是否过期
  if (data.expireAt && Date.now() > data.expireAt) {
    store.remove(key); // 数据已过期，删除缓存
    return null;
  }

  return data.value;
}

/* 移除缓存数据 */
export function removeCache(key: string) {
  store.remove(key);
}
