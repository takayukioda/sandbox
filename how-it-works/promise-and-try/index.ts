export const Controller = async (n: number): Promise<number | undefined> => {
  console.log('--> Controller')
  const core = await TheService(n);

  AsyncService(5).catch(() => console.log('Got an error; continuing the process'));
  await TheService(4);
  
  return core
}

export const TheService = async (n: number): Promise<number> => {
  console.log('---> TheService')
  const ok = await AsyncValidate(n)
  if (!ok) {
    throw new Error(`Validation not ok: ${n}`)
  }

  return Save(n % 5)
}

export const AsyncService = async (n: number): Promise<number> => {
  console.log('---> AsyncService')

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (SyncValidate(n)) {
        console.log('AsyncService resolved');
        return resolve(n);
      }
        console.log('AsyncService rejected');
      return reject(n);
    }, n * 100)
  });
}

export const SyncValidate = (n: number): boolean => {
  console.log('----> SyncValidate');
  return n % 5 !== 0;
}

export const AsyncValidate = async (n: number): Promise<boolean> => {
  console.log('----> AsyncValidate');
  return n % 5 !== 0;
}

export const Save = async (n: number): Promise<number> => {
  console.log('----> Save')
  if (n % 3 === 0) {
    throw new Error(`Oooops, cannot save this value! ${n}`)
  }

  return n
}

(async (go: boolean) => {
  if (!go) return;
  console.log('=> Starting behaviour check');

  try {
    await Controller(7);
  } catch (err) {
    console.error('----- I catched it!! -----');
    console.error(err)
    console.error('----- ----- -- ----- -----')
  }
})(true);
