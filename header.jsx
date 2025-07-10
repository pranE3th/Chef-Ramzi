import chefClaudeLogo from "./image-folder/chef-claude-icon.png"
export default function Header(){
    return(
        <header className="header">
        <div className="logo-glow">
        <img src={chefClaudeLogo} alt="claude image"/>
        </div>
        <h1>Chef Ramzi</h1>
        </header>
    );
}