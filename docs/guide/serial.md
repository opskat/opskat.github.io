---
sidebar_position: 10
sidebar_label: Serial Port
---

# Serial Port

Serial port assets connect to devices over a serial console — useful for network gear, embedded boards, and out-of-band management.

## Creating a Serial Asset

Create a serial asset (see [Asset Management](/docs/guide/asset-management)) with:

- **Port Path** — the serial device path (required), e.g. `COM3` on Windows or `/dev/ttyUSB0` on Linux/macOS
- **Baud Rate** — the connection speed (required), e.g. `9600` or `115200`
- **Data Bits** — `5`, `6`, `7`, or `8` (default: `8`)
- **Stop Bits** — `1`, `1.5`, or `2` (default: `1`)
- **Parity** — `none`, `odd`, `even`, `mark`, or `space` (default: `none`)
- **Flow Control** — `none` or `hardware`

## Using the Console

Open the asset to attach a terminal to the serial port. The session presents the device's serial console using the configured line settings, with the same terminal experience as other OpsKat terminals (see [SSH Terminal](/docs/guide/ssh-terminal)).
