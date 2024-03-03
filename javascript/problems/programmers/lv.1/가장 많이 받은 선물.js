const getInitialState = (friends) => {
  const state = {
    count: 0,
    index: 0,
    receivers: new Map(),
  };

  for (const friend of friends) {
    state.receivers.set(friend, 0);
  }

  return state;
};

function solution(friends, gifts) {
  let answer = 0;

  const tradeMap = new Map();

  for (const friend of friends) {
    tradeMap.set(friend, getInitialState(friends));
  }

  gifts.forEach((gift) => {
    const [sender, receiver] = gift.split(' ');

    const senderInfo = tradeMap.get(sender);
    const receiverInfo = tradeMap.get(receiver);

    senderInfo.receivers.set(receiver, senderInfo.receivers.get(receiver) + 1);

    senderInfo.index += 1;
    receiverInfo.index -= 1;
  });

  for (const me of friends) {
    const myInfo = tradeMap.get(me);

    for (const friend of friends) {
      if (me === friend) continue;

      const friendInfo = tradeMap.get(friend);

      const isMoreIndex = myInfo.index > friendInfo.index;

      const sendCount = myInfo.receivers.get(friend);
      const receiveCount = friendInfo.receivers.get(me);

      const isSendMore = sendCount > receiveCount;

      // 교환 기록이 있을 때, 더 많이 준 케이스
      if (!!sendCount && !!receiveCount && isSendMore) {
        myInfo.count += 1;
      }

      // 없거나 주고받은 수가 같은 경우
      if (sendCount === receiveCount) {
        myInfo.count += isMoreIndex;
      }

      // 일방적으로 준 경우
      if (!!sendCount && !receiveCount) {
        myInfo.count += 1;
      }
    }

    answer = Math.max(answer, myInfo.count);
  }

  return answer;
}
