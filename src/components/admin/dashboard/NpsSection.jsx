import NumberCard from "../../../molecules/cards/NumberCard";

const NpsSection = () => (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-4">My NPS</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <NumberCard title="This Month" value="-33" textColor="text-electric" />
        <NumberCard title="This Year" value="-20" textColor="text-neon" />
        <NumberCard title="Survey Count" value="61" textColor="text-electric" />
      </div>
    </section>
  );

  export default NpsSection