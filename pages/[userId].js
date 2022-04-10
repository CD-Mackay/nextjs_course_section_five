function UserId(props) {
  return (
    <h1>{props.id}</h1>
  )
};

export default UserId;

export async function getServerSideProps(context) {
  const { params } = context;

  const userId = params.userId;

  return {
    props: {
      id: 'userid-' + userId,
    }
  }
}