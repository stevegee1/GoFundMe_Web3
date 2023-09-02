// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "./PriceConverter.sol";
import "hardhat/console.sol";

/**
 * @author xxg.eth
 * @title A goFundMe contract
 */
contract FundMe {
    //Type declarations
    using PriceConverter for uint256;

    //state variables
    address[] private s_funders;
    mapping(address => uint256) private s_addressToAmountFunded;
    AggregatorV3Interface private immutable s_priceFeed;
    address private immutable i_owner;
    uint256 public constant MINIMUM_USD = 50 * 10**18;

    //errors
    error NotOwner();

    constructor(address priceFeedAddress) {
        i_owner = msg.sender;
        s_priceFeed = AggregatorV3Interface(priceFeedAddress);
    }

    fallback() external payable {
        fund();
    }

    receive() external payable {
        fund();
    }

    modifier onlyOwner() {
        // require(msg.sender == owner);
        if (msg.sender != i_owner) revert NotOwner();
        _;
    }

    /**
     * receive fund in eth with the minimum of 50usd in eth
     */
    function fund() public payable {
        require(
            msg.value.getConversionRate(s_priceFeed) >= MINIMUM_USD,
            "You need to spend more ETH!"
        );
        // require(PriceConverter.getConversionRate(msg.value) >= MINIMUM_USD, "You need to spend more ETH!");
        s_addressToAmountFunded[msg.sender] += msg.value;
        s_funders.push(msg.sender);
    }

    function withdraw() public onlyOwner {
        address[] memory funders;
        funders = s_funders;

        for (
            uint256 funderIndex = 0;
            funderIndex < funders.length; //reading  state variable
            funderIndex++
        ) {
            address funder = funders[funderIndex]; //reading from a state variable
            s_addressToAmountFunded[funder] = 0; //writing to a state variable
        }
        s_funders = new address[](0); //writing to a state variable
        (bool callSuccess, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(callSuccess, "Call failed");
    }

    function cheaperWithdraw() public payable onlyOwner {}

    function getVersion() public view returns (uint256) {
        // ETH/USD price feed address of Sepolia Network.

        return s_priceFeed.version();
    }

    function getFunder(uint256 _index) public view returns (address) {
        return s_funders[_index];
    }

    function getAmountFundedByAddress(address _funder)
        public
        view
        returns (uint256)
    {
        return s_addressToAmountFunded[_funder];
    }

    function getOwner() public view returns (address) {
        return i_owner;
    }

    function getPriceFeed() public view returns (AggregatorV3Interface) {
        return s_priceFeed;
    }
}
