import React from "react";

const JoinSession = async () => {
  OV = new OpenVidu();

  let mySession = OV.initSession();
  setSession(mySession);

  const token = await getToken();

  mySession.connect(token, { clientData: myUserName })
    .then(() => {
      localUser.setNickname(myUserName);
      localUser.setConnectionId(mySession.connection.connectionId);
    });

  mySession.on('streamCreated', (event) => {
    const subscriber = mySession.subscribe(event.stream, 'subscriber');
    setSubscribers(subscriber)
  });

  mySession.on('streamDestroyed', (event) => {
    deleteSubscriber(event.stream.streamManager);
  });

  mySession.on('exception', (exception) => {
    console.warn(exception);
  });

  mySession.on('connectionCreated', (({ stream }) => {
    setTotalUsers((prevTotalUsers) => {
      return prevTotalUsers + 1
    })
  }));

  mySession.on('connectionDestroyed', (({ stream }) => {
    setTotalUsers((prevTotalUsers) => {
      return prevTotalUsers - 1
    })
  }));

  mySession.on("signal:chat", (event) => {
    setMessageList((prevMessageList) => {
      return [...prevMessageList, event.data]
    })
  });
};
