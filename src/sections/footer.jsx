import TextEffectWithExit from "../components/text-effect";

const Footer = () => {
  return (
    <section className="c-space pt-7 pb-3 border-t border-black-300 flex flex-col  items-center gap-5 relative w-full overflow-x-hidden overflow-y-hidden">
      <div className="text-white-500 flex gap-2 absolute top-1 origin-top-left scale-[1]">
        <TextEffectWithExit
          text="Powered by Polar Bear"
          style="text-white text-sm font-bold"
        />
      </div>

      <p className="text-neutral-500 font-grotesk font-normal mt-[25px] text-[12px] self-center text-center">
        2025, All Rights Reserved
      </p>
    </section>
  );
};

export default Footer;
