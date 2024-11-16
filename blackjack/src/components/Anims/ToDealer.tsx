
const ToDealer = ({display}:any) => {
    console.log(display)
  return (
    <div className={` w-[42px] h-16 rounded-[3px] overflow-hidden ${display==true?" scale-100 toDealerAnim":"scale-75"}`}>
    <img
        src="./closed-card.svg"
        alt="closed-card"
        className="w-full h-full"
    />
    </div>
  )
}

export default ToDealer