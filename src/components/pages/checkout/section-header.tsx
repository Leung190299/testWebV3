const SectionHeader = (props: { title: string; desc?: string }) => {
  return (
    <div className="py-4 md:py-5">
      <h3 className="md:text-xl">
        <b>{props.title}</b>
      </h3>
      {props.desc && <p className="max-md:hidden mt-1 text-xs md:text-sm text-neutral-500">{props.desc}</p>}
    </div>
  );
};
export default SectionHeader;
