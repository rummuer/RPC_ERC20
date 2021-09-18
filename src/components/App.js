import React, { Component } from "react";
import Web3 from "web3";
import "./App.css";
import RPS_ERC20 from "../abis/RPS_ERC20.json";
import "./rock.png";

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert("Non-Ethereum browser detected. Try metamask");
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });

    const networkId = await web3.eth.net.getId();
    const networkData = RPS_ERC20.networks[networkId];
    if (networkData) {
      const abi = RPS_ERC20.abi;
      const address = networkData.address;
      const contract = new web3.eth.Contract(abi, address);
      this.setState({ contract });
      const owner = await contract.methods.owner().call();
      console.log(owner);
      this.setState({ owner });
    } else {
      window.alert("smart contract not deployed to detected network.");
    }
  }
  async callPlay() {
    const result = this.state.contract.methods
      .play()
      .send({ from: this.state.account });
  }
  async callMint(mintAddress, mintValue) {
    console.log(mintAddress);
    const result = await this.state.contract.methods
      .mint(mintAddress, mintValue)
      .send({ from: this.state.account });

    console.log(result);
  }
  async getBalance(AddressBal) {
    console.log(AddressBal);
    const result = await this.state.contract.methods
      .balanceOf(AddressBal)
      .call({ from: this.state.account });
  }
  async getChoice(choice) {
    console.log(choice);
    console.log(this.state.account);
    const result = await this.state.contract.methods
      .play(choice, 10)
      .send({ from: this.state.account });
    console.log(result);
  }
  constructor(props) {
    super(props);
    this.state = { account: "", contract: null, owner: "" };
  }
  render() {
    return (
      <div>
        <div>
          <nav className="navbar navbar-dark fixed-top bg-light flex-md-nowrap p-0 shadow">
            <a className="navbar-brand col-sm-3 col-md-2 mr-0 ">
              Rock Paper Scissors
            </a>
            <span id="account" className="nav-item navbar-nav ">
              {this.state.account}
            </span>
          </nav>
        </div>
        <div className="col-md-6 col-md-offset-4">
          <form
            onSubmit={event => {
              event.preventDefault();
              const mintAddress = this.mintAddress.value;
              const mintValue = this.mintValue.value;
              this.callMint(mintAddress, mintValue);
            }}
          >
            <div className="form-group col-md-6">
              <label htmlFor="mintAddress">Mint Address</label>
              <input
                type="text"
                className="form-control"
                id="mintAddress"
                aria-describedby="mintHelp"
                placeholder="Enter mint address"
                ref={mintAddress => (this.mintAddress = mintAddress)}
              />
              <small id="mintHelp" className="form-text text-muted">
                Please enter the receiver address
              </small>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="mintValue">Mint Value</label>
              <input
                type="text"
                className="form-control"
                id="mintValue"
                placeholder="mint value"
                ref={mintValue => (this.mintValue = mintValue)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Mint
            </button>
          </form>
        </div>
        <div className="col-md-6 col-md-offset-4">
          <form
            onSubmit={event => {
              event.preventDefault();
              const AddressBal = this.AddressBal.value;
              this.getBalance(AddressBal);
            }}
          >
            <div className="form-group col-md-6">
              <label htmlFor="mintAddress">Enter Address</label>
              <input
                type="text"
                className="form-control"
                id="mintAddress"
                aria-describedby="mintHelp"
                placeholder="Enter address"
                ref={AddressBal => (this.AddressBal = AddressBal)}
              />
              <small id="mintHelp" className="form-text text-muted">
                Please enter the address
              </small>
            </div>
            <button type="submit" className="btn btn-primary">
              Get Balance
            </button>
          </form>
        </div>
        <div className="form-group col-md-6">
          <form
            onSubmit={event => {
              event.preventDefault();
              const choice = 0;
              this.getChoice(choice);
            }}
          >
            <button className="btn btn-primary">
              <img src="rock.png" width="20" /> Rock
            </button>
          </form>
          <form
            onSubmit={event => {
              event.preventDefault();
              const choice = 1;
              this.getChoice(choice);
            }}
          >
            <button className="btn btn-primary">
              <img src="paper.png" width="20" /> Paper
            </button>
          </form>
          <form
            onSubmit={event => {
              event.preventDefault();
              const choice = 2;
              this.getChoice(choice);
            }}
          >
            <button className="btn btn-primary">
              <img src="Scissor.png" width="20" /> Scissor
            </button>
          </form>
        </div>
      </div>
    );
  }
}
export default App;
