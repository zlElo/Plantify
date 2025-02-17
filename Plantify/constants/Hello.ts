export const getCurrentTime = () => {
    const hour = new Date().getHours();
    return hour < 10 ? 'Guten Morgen!' : hour < 18 ? 'Hallo!' : 'Guten Abend!';
  }