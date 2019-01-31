const sendMessage = (name, data) => {
  window.postMessage(
    {
      source: 'bem-validator-agent',
      name,
      data: data || {},
    },
    '*',
  );
};

module.exports = sendMessage;
