import GameContainer from '../components/gameContainer/GameContainer';
import Header from '../components/header/Header';
// import GameResult from '../components/Results/GameResult';
import Sidebar from '../components/sidebar/Sidebar';

const Dashboard = () => {
  return (
    <div className="flex sm:h-[450px] md:h-[600px] md:min-w-[700px] border border-cyan-900 rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 relative">
      <Sidebar />
      <div className="flex flex-col text-center absolute inset-y-0 right-0 md:min-w-[400px] w-[499px]">
        <div>
          <Header />
        </div>
        <div className='w-[499px] md:h-[600px]'>
          <GameContainer />
          {/* <GameResult /> */}
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
