// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

contract BoxV2 {
    uint256 internal s_value;

    event ValueChanged(uint256 _value);

    function store(uint256 _value) public {
        s_value = _value;
        emit ValueChanged(_value);
    }

    function increment() public {
        s_value += 1;
        emit ValueChanged(s_value);
    }

    function getValue() public view returns (uint256) {
        return s_value;
    }

    function version() public pure returns (uint256) {
        return 2;
    }
}
