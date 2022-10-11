// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract CV_Storage {
    struct CV {
        address owner;
        string name;
        string description;
        string experience;
        string skills;
        string date;
    }

    address public owner;
    address public prevCV;
    CV private cv;

    constructor() {
        owner = msg.sender;
        prevCV = address(0);

        // CV variables initialization
        cv.owner = msg.sender;
        cv.name = "";
        cv.description = "";
        cv.experience = "";
        cv.skills = "";
        cv.date = "";
    }

    /****************************
              Modifiers
    *****************************/

    // Only Owner Modifier
    modifier restricted() {
        require(
            msg.sender == owner,
            "This function is restricted to the contract's owner"
        );
        _;
    }

    // Only Add Previous refernce when a reference does not exist
    modifier notChanged() {
        require(prevCV == address(0), "A previous reference already exists");
        _;
    }

    // Only Change cv data when cv not edited
    modifier CVNotEdited() {
        require(
            keccak256(abi.encodePacked((cv.name))) ==
                keccak256(abi.encodePacked((""))),
            "This CV cannot be altered"
        );
        _;
    }

    /****************************
              Functions
    *****************************/

    function addCV(
        string calldata _name,
        string calldata _description,
        string calldata _experience,
        string calldata _skills,
        string calldata _date
    ) public restricted CVNotEdited {
        cv.name = _name;
        cv.description = _description;
        cv.experience = _experience;
        cv.skills = _skills;
        cv.date = _date;
    }

    function viewCV() public view returns (CV memory) {
        return cv;
    }

    function linkToPrev(address _prevCV) public restricted notChanged {
        prevCV = _prevCV;
    }
}
