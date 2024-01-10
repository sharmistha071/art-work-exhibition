type PlaceHolderMessageProps = {
  message: string;
};

const PlaceHolderMessage = ({ message }: PlaceHolderMessageProps) => {
  return (
    <section style={{ display: "flex", justifyContent: "center" }}>
      <h6>{message}</h6>
    </section>
  );
};

export default PlaceHolderMessage;
