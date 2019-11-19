export const TryController = async (n: number): Promise<number | undefined> => {
  try {
    return await AwaitService(n)
  } catch (err) {
    throw err
  }
}

export const NoTryController = async (n: number): Promise<number | undefined> => {
  return await AwaitService(n)
}


export const AwaitService = async (n: number): Promise<number> => {
  await Validate(n)
  return Save(n % 5)
}

export const NoAwaitService = async (n: number): Promise<number> => {
  Validate(n)
  return Save(n % 5)
}


export const Validate = async (n: number): Promise<void> => {
  if (n % 5 === 0) {
    throw new Error('Oooops, found an invalid value!')
  }
}

export const Save = async (n: number): Promise<number> => {
  if (n % 3 === 0) {
    throw new Error('Oooops, cannot save this value!')
  }
  return n
}

(async (go: boolean) => {
  if (!go) return;
  try {
    console.log('== Await at last ==');
    const tc1 = TryController(1);
    const tc2 = TryController(2);
    const tc3 = TryController(3); // cannot save value
    const tc4 = TryController(4);
    const tc5 = TryController(5); // invalid value

    await tc1;
    await tc2;
    await tc3;
    await tc4;
    await tc5;
  } catch (err) {
    console.log('Found an error');
    console.error(err.message);
  }
})(false);

(async (go: boolean) => {
  if (!go) return;
  try {
    console.log('== Await for each ==');
    await TryController(1);
    await TryController(2);
    await TryController(3); // cannot save value
    await TryController(4);
    await TryController(5); // invalid value
  } catch (err) {
    console.log('Found an error');
    console.error(err.message);
  }
})(true);
