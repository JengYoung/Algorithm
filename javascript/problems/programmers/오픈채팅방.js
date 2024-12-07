const solution = (record) => {
  const nameCache = new Map();
  const logCache = [];

  const createMessage = ({ id, command }) => {
    const name = nameCache.get(id);
    if (command === 'Enter') {
      return `${name}님이 들어왔습니다.`;
    }

    if (command === 'Leave') {
      return `${name}님이 나갔습니다.`;
    }

    throw new Error('Wrong command.');
  };

  record.forEach((now) => {
    const [command, id, nickname] = now.split(' ');

    switch (command) {
      case 'Enter': {
        nameCache.set(id, nickname);

        logCache.push({
          command,
          id,
        });

        break;
      }

      case 'Leave': {
        nameCache.delete(id);

        logCache.push({
          command,
          id,
        });
        break;
      }

      case 'Change': {
        nameCache.set(id, nickname);

        break;
      }

      default: {
        throw new Error('Wrong command!');
      }
    }
  });

  return logCache.map(createMessage);
};

(() => {
  console.log(
    solution([
      'Enter uid1234 Muzi',
      'Enter uid4567 Prodo',
      'Leave uid1234',
      'Enter uid1234 Prodo',
      'Change uid4567 Ryan',
    ]) // ["Prodo님이 들어왔습니다.", "Ryan님이 들어왔습니다.", "Prodo님이 나갔습니다.", "Prodo님이 들어왔습니다."]
  );
})();
