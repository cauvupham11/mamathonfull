const Coin = () => {
  return (
    <div className="flex fixed top-4" style={{ right: "200px" }}>
      <img
        className="w-10 h-10"
        src="/src/assets/img/coin_1.png"
        alt="Coin"
      />
      <span className="flex text-l bg-yellow-100 w-32 h-7 mx-2 mt-1 rounded-full pl-4">
        1
      </span>
    </div>
  );
};

export default Coin;
