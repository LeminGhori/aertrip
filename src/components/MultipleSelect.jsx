import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function MultipleSelect({ fieldName, apiEndpoint, maxSelectLimit, action }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const personName = useSelector(
    (state) => state.flight?.[fieldName.toLowerCase()]
  );
  const [names, setNames] = React.useState({});

  React.useEffect(() => {
    try {
      axios
        .get(apiEndpoint)
        .then((response) => {
          if (
            response.data.data &&
            response.data.data.flights &&
            Array.isArray(response.data.data.flights)
          ) {
            const firstFlight = response.data.data.flights[0];
            if (firstFlight && firstFlight.results.apdet) {
              setNames(firstFlight.results.apdet);
            } else {
              console.warn(
                "apdet is undefined or not an object in the first flight"
              );
            }
          } else {
            console.warn("flights is undefined or not an array");
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } catch {
      console.error("Error fetching data:", error);
    }

  }, [apiEndpoint]);

  const memoizedNames = React.useMemo(() => names, [names]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    if (value.length <= maxSelectLimit) {
      // Dispatch the action with the new selected values
      dispatch(action(value));
    }
  };

  const renderSelectedValue = (selected) => {
    return selected
      .map((value) => {
        return value;
      })
      .join(", ");
  };

  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel id="demo-multiple-name-label">{fieldName}</InputLabel>
      <Select
        labelId="demo-multiple-name-label"
        id="demo-multiple-name"
        multiple
        value={personName}
        onChange={handleChange}
        input={<OutlinedInput label={fieldName} />}
        renderValue={renderSelectedValue}
        MenuProps={MenuProps}
      >
        {Object.keys(memoizedNames).map((name) => (
          <MenuItem
            key={name}
            value={memoizedNames[name].c}
            style={getStyles(name, personName, theme)}
          >
            <div className="city-li-mean">
              <div className="city-left">
                <div className="city-label">{name}</div>
                <div className="city-label-sub">{memoizedNames[name].hw}</div>
              </div>
              <div className="city-right">
                <div className="city-label">{`${memoizedNames[name].c}, ${memoizedNames[name].cn}`}</div>
                <div className="city-label-sub">{memoizedNames[name].n}</div>
              </div>
            </div>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default MultipleSelect;
