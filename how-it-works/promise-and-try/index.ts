export const Controller = async (n: number): Promise<number | undefined> => {
  console.log('--> Controller')
  const core = await TheService(n);

  AsyncService(5).catch(() => console.log('Got an error; continuing the process'));
  await TheService(4);
  
  console.log('<-- Controller')
  return core
}

export const TheService = async (n: number): Promise<number> => {
  console.log('---> TheService')
  const ok = await AsyncValidate(n)
  if (!ok) {
    throw new Error(`Validation not ok: ${n}`)
  }

  const save = Save(n % 5)

  console.log('<-- TheService')
  return save
}

export const AsyncService = async (n: number): Promise<number> => {
  console.log('---> AsyncService')

  const promise = new Promise<number>((resolve, reject) => {
    setTimeout(() => {
      if (SyncValidate(n)) {
        console.log('AsyncService resolved');
        return resolve(n);
      }
        console.log('AsyncService rejected');
      return reject(n);
    }, n * 100)
  });
  console.log('<--- AsyncService')
  return promise
}

export const SyncValidate = (n: number): boolean => {
  console.log('----> SyncValidate');
  const bool = n % 5 !== 0;
  console.log('<---- SyncValidate');
  return bool
}

export const AsyncValidate = async (n: number): Promise<boolean> => {
  console.log('----> AsyncValidate');
  const bool = n % 5 !== 0;
  console.log('<---- AsyncValidate');
  return bool
}

export const Save = async (n: number): Promise<number> => {
  console.log('----> Save')
  if (n % 3 === 0) {
    throw new Error(`Oooops, cannot save this value! ${n}`)
  }
  console.log('===== Save', n)

  console.log('<---- Save')
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
