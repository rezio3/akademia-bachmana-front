import PageTitle from "../components/elements/PageTitle";
import Actions from "../components/leaders/Actions";
import PersonsList from "../components/leaders/PersonsList";

const LeadersPage = () => {
  return (
    <>
      <PageTitle>Prowadzący i muzycy</PageTitle>
      <Actions />
      <PersonsList />
    </>
  );
};

export default LeadersPage;
