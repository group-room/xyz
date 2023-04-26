import Image from "next/image";

export default function TimecapsuleMachine() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <div className="mb-4">
          <Image
            src="/images/machine.svg"
            alt="machine"
            width={320}
            height={140}
          />
        </div>
        <div>
          <Image
            src="/images/capsule.svg"
            alt="capsule"
            width={100}
            height={100}
          />
        </div>
      </div>
    </div>
  );
}
