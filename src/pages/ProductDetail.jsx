import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './ProductDetail.css'

const demoProducts = [
  {
    id: 1,
    name: "Embedded Controller Module",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
    description: "High-performance embedded controller module designed for industrial automation. Features ARM Cortex-M4 processor with real-time capabilities and multiple I/O interfaces.",
    fullDescription: "Our Embedded Controller Module is engineered for demanding industrial applications. Built around the powerful ARM Cortex-M4 processor running at 180MHz, this module delivers exceptional real-time performance for automation, robotics, and control systems. The module features 512KB Flash memory, 256KB SRAM, and includes multiple communication interfaces including UART, SPI, I2C, CAN, and Ethernet. With its robust design and wide operating temperature range (-40°C to +85°C), it's perfect for harsh industrial environments.",
    features: ["ARM Cortex-M4 @ 180MHz", "512KB Flash, 256KB SRAM", "Multiple I/O interfaces", "Industrial temperature range", "Real-time operating capability"],
    specifications: { "Processor": "ARM Cortex-M4", "Clock Speed": "180 MHz", "Flash Memory": "512 KB", "RAM": "256 KB", "Operating Voltage": "3.3V - 5V" }
  },
  {
    id: 2,
    name: "IoT Gateway Device",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    description: "Smart IoT gateway supporting multiple protocols including MQTT, CoAP, and HTTP. Enables seamless connectivity between edge devices and cloud platforms.",
    fullDescription: "The IoT Gateway Device serves as the central hub for your connected ecosystem. It bridges the gap between local sensors/devices and cloud platforms, supporting industry-standard protocols like MQTT, CoAP, HTTP/HTTPS, and WebSocket. With built-in edge computing capabilities, it can process data locally before sending to the cloud, reducing bandwidth and latency. The gateway includes secure boot, encrypted storage, and TLS 1.3 support for enterprise-grade security.",
    features: ["Multi-protocol support", "Edge computing capability", "Secure boot & encryption", "Cloud platform integration", "Local data processing"],
    specifications: { "Protocols": "MQTT, CoAP, HTTP, WebSocket", "Connectivity": "WiFi, Ethernet, 4G LTE", "Security": "TLS 1.3, AES-256", "Storage": "32GB eMMC", "Power": "5V DC, 2A" }
  },
  {
    id: 3,
    name: "PCB Design Kit",
    image: "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?w=800&h=600&fit=crop",
    description: "Professional PCB design and prototyping kit with multi-layer board support. Includes schematic capture tools and automated routing features.",
    fullDescription: "Our PCB Design Kit provides everything you need for professional circuit board development. From concept to prototype, this comprehensive kit includes advanced schematic capture software, multi-layer PCB layout tools, and automated routing algorithms. The kit supports designs up to 32 layers with blind and buried vias. Integrated design rule checking ensures your boards are manufacturable, while the 3D viewer lets you visualize the final product before fabrication.",
    features: ["Up to 32-layer support", "Automated routing", "Design rule checking", "3D visualization", "Gerber export"],
    specifications: { "Max Layers": "32", "Min Track Width": "0.1mm", "Via Types": "Through, Blind, Buried", "Export Formats": "Gerber, ODB++, IPC-2581", "Component Library": "500,000+ parts" }
  },
  {
    id: 4,
    name: "Sensor Interface Board",
    image: "https://images.unsplash.com/photo-1601132359864-c974e79890ac?w=800&h=600&fit=crop",
    description: "Universal sensor interface board compatible with analog and digital sensors. Supports temperature, pressure, humidity, and motion detection modules.",
    fullDescription: "The Sensor Interface Board is your universal solution for connecting various sensors to your embedded systems. It features 8 analog inputs with 16-bit ADC resolution, 12 digital I/O pins, and dedicated interfaces for I2C, SPI, and 1-Wire sensors. The onboard signal conditioning circuits include programmable gain amplifiers, filters, and protection circuits. Compatible with Arduino, Raspberry Pi, and industrial PLCs.",
    features: ["16-bit ADC resolution", "8 analog + 12 digital channels", "Signal conditioning", "Multiple interface support", "Arduino/RPi compatible"],
    specifications: { "Analog Inputs": "8 channels", "ADC Resolution": "16-bit", "Digital I/O": "12 pins", "Interfaces": "I2C, SPI, 1-Wire, UART", "Input Protection": "ESD & overvoltage" }
  },
  {
    id: 5,
    name: "Power Management Unit",
    image: "https://images.unsplash.com/photo-1563770660941-20978e870e26?w=800&h=600&fit=crop",
    description: "Intelligent power management unit with battery charging, voltage regulation, and power monitoring. Ideal for portable and battery-operated systems.",
    fullDescription: "The Power Management Unit (PMU) is an all-in-one solution for portable and battery-powered devices. It combines battery charging (Li-Ion/Li-Po/LiFePO4), multiple voltage regulators, and comprehensive power monitoring in a compact module. The intelligent charging algorithm maximizes battery life while the power path management ensures uninterrupted operation during charging. Real-time monitoring provides voltage, current, and power consumption data via I2C interface.",
    features: ["Multi-chemistry charging", "MPPT solar input", "Power path management", "Real-time monitoring", "Programmable outputs"],
    specifications: { "Input Voltage": "5V - 24V DC", "Battery Types": "Li-Ion, Li-Po, LiFePO4", "Charge Current": "Up to 3A", "Outputs": "3.3V, 5V, 12V regulated", "Efficiency": ">95%" }
  },
  {
    id: 6,
    name: "Wireless Communication Module",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=600&fit=crop",
    description: "Compact wireless module supporting WiFi, Bluetooth, and LoRa protocols. Perfect for remote monitoring and data transmission applications.",
    fullDescription: "Our Wireless Communication Module combines three popular wireless technologies in one compact package. WiFi 802.11 b/g/n provides high-speed local connectivity, Bluetooth 5.0 enables short-range device communication, and LoRa offers long-range (up to 15km) low-power transmission. The module includes an onboard antenna and U.FL connector for external antenna option. AT command interface and Arduino libraries make integration straightforward.",
    features: ["Triple wireless protocols", "Long-range LoRa (15km)", "Low power consumption", "Onboard + external antenna", "Easy AT commands"],
    specifications: { "WiFi": "802.11 b/g/n, 2.4GHz", "Bluetooth": "5.0 BLE", "LoRa": "868/915MHz, SF7-SF12", "Range": "Up to 15km (LoRa)", "Power": "3.3V, <100mA active" }
  },
  {
    id: 7,
    name: "Motor Driver Board",
    image: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=800&h=600&fit=crop",
    description: "High-current motor driver board for DC and stepper motors. Features overcurrent protection, PWM control, and thermal management system.",
    fullDescription: "The Motor Driver Board is designed for demanding motion control applications. It can drive two DC motors up to 10A each or one stepper motor up to 5A per phase. The H-bridge design allows for bidirectional control with smooth PWM speed regulation up to 20kHz. Built-in protection includes overcurrent shutdown, thermal protection with active cooling option, and back-EMF protection. The board accepts standard PWM/DIR signals or step/direction for stepper control.",
    features: ["Dual 10A H-bridge", "20kHz PWM capable", "Overcurrent protection", "Thermal management", "DC & stepper support"],
    specifications: { "Motor Voltage": "6V - 36V", "Continuous Current": "10A per channel", "Peak Current": "20A", "PWM Frequency": "Up to 20kHz", "Control Interface": "PWM/DIR or Step/DIR" }
  },
  {
    id: 8,
    name: "Display Interface Module",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=600&fit=crop",
    description: "Versatile display interface supporting LCD, OLED, and TFT panels. Includes graphics library and touchscreen controller integration.",
    fullDescription: "The Display Interface Module simplifies adding visual displays to your projects. It supports character LCDs, graphic OLEDs, and color TFT panels up to 800x480 resolution. The onboard graphics controller handles display refresh, freeing your main processor for other tasks. Integrated touchscreen controller supports both resistive and capacitive touch panels. The included graphics library provides drawing primitives, fonts, and image rendering functions.",
    features: ["Multiple display types", "Up to 800x480 resolution", "Touch support (resistive/capacitive)", "Graphics acceleration", "Comprehensive library"],
    specifications: { "Max Resolution": "800x480", "Color Depth": "16-bit (65K colors)", "Touch": "Resistive & Capacitive", "Interface": "SPI, I2C, Parallel", "Backlight": "PWM dimmable" }
  },
  {
    id: 9,
    name: "Voltage Divider Calculator",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=600&fit=crop",
    description: "Interactive voltage divider calculator tool. Calculate output voltage, input voltage, or resistor values using the standard voltage divider formula.",
    fullDescription: "The Voltage Divider Calculator is an essential tool for electronics engineers and hobbyists. A voltage divider is a simple circuit that produces an output voltage (Vout) that is a fraction of the input voltage (Vin). It uses two resistors (R1 and R2) in series. The formula is: Vout = Vin × (R2 / (R1 + R2)). This calculator allows you to solve for any unknown value when you know the other three parameters.",
    features: ["Calculate Vout from Vin, R1, R2", "Calculate Vin from Vout, R1, R2", "Calculate R1 from Vin, Vout, R2", "Calculate R2 from Vin, Vout, R1", "Real-time calculation"],
    specifications: { "Formula": "Vout = Vin × (R2 / (R1 + R2))", "Inputs": "Vin, R1, R2, Vout", "Output": "Unknown value", "Precision": "Up to 6 decimal places", "Units": "Volts, Ohms" },
    hasCalculator: true
  }
]

// Voltage Divider Calculator Component
function VoltageDividerCalculator() {
  const [vin, setVin] = useState('')
  const [r1, setR1] = useState('')
  const [r2, setR2] = useState('')
  const [vout, setVout] = useState('')
  const [solveFor, setSolveFor] = useState('vout')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const calculate = () => {
    setError('')
    setResult(null)

    const vinVal = parseFloat(vin)
    const r1Val = parseFloat(r1)
    const r2Val = parseFloat(r2)
    const voutVal = parseFloat(vout)

    try {
      let calculatedValue
      let label
      let unit

      switch (solveFor) {
        case 'vout':
          if (isNaN(vinVal) || isNaN(r1Val) || isNaN(r2Val)) {
            setError('Please enter Vin, R1, and R2 values')
            return
          }
          if (r1Val + r2Val === 0) {
            setError('R1 + R2 cannot be zero')
            return
          }
          calculatedValue = vinVal * (r2Val / (r1Val + r2Val))
          label = 'Output Voltage (Vout)'
          unit = 'V'
          break

        case 'vin':
          if (isNaN(voutVal) || isNaN(r1Val) || isNaN(r2Val)) {
            setError('Please enter Vout, R1, and R2 values')
            return
          }
          if (r2Val === 0) {
            setError('R2 cannot be zero')
            return
          }
          calculatedValue = voutVal * (r1Val + r2Val) / r2Val
          label = 'Input Voltage (Vin)'
          unit = 'V'
          break

        case 'r1':
          if (isNaN(vinVal) || isNaN(voutVal) || isNaN(r2Val)) {
            setError('Please enter Vin, Vout, and R2 values')
            return
          }
          if (voutVal === 0) {
            setError('Vout cannot be zero for R1 calculation')
            return
          }
          calculatedValue = r2Val * (vinVal - voutVal) / voutVal
          label = 'Resistor 1 (R1)'
          unit = 'Ω'
          break

        case 'r2':
          if (isNaN(vinVal) || isNaN(voutVal) || isNaN(r1Val)) {
            setError('Please enter Vin, Vout, and R1 values')
            return
          }
          if (vinVal - voutVal === 0) {
            setError('Vin and Vout cannot be equal')
            return
          }
          calculatedValue = (voutVal * r1Val) / (vinVal - voutVal)
          label = 'Resistor 2 (R2)'
          unit = 'Ω'
          break

        default:
          setError('Invalid selection')
          return
      }

      if (calculatedValue < 0) {
        setError('Result is negative. Check your input values.')
        return
      }

      setResult({ value: calculatedValue.toFixed(6), label, unit })
    } catch (err) {
      setError('Calculation error. Please check your inputs.')
    }
  }

  const resetCalculator = () => {
    setVin('')
    setR1('')
    setR2('')
    setVout('')
    setResult(null)
    setError('')
  }

  return (
    <div className="voltage-calculator">
      <h3>Voltage Divider Calculator</h3>

      <div className="calculator-diagram">
        <svg viewBox="0 0 200 180" className="circuit-svg">
          {/* Vin connection */}
          <line x1="20" y1="30" x2="100" y2="30" stroke="#667eea" strokeWidth="2"/>
          <text x="10" y="35" fill="#fff" fontSize="12">Vin</text>

          {/* R1 resistor */}
          <rect x="85" y="40" width="30" height="50" fill="none" stroke="#667eea" strokeWidth="2"/>
          <text x="100" y="70" fill="#fff" fontSize="10" textAnchor="middle">R1</text>
          <line x1="100" y1="30" x2="100" y2="40" stroke="#667eea" strokeWidth="2"/>
          <line x1="100" y1="90" x2="100" y2="100" stroke="#667eea" strokeWidth="2"/>

          {/* Vout connection */}
          <line x1="100" y1="100" x2="160" y2="100" stroke="#764ba2" strokeWidth="2"/>
          <text x="170" y="105" fill="#fff" fontSize="12">Vout</text>
          <circle cx="100" cy="100" r="4" fill="#764ba2"/>

          {/* R2 resistor */}
          <rect x="85" y="110" width="30" height="50" fill="none" stroke="#667eea" strokeWidth="2"/>
          <text x="100" y="140" fill="#fff" fontSize="10" textAnchor="middle">R2</text>
          <line x1="100" y1="100" x2="100" y2="110" stroke="#667eea" strokeWidth="2"/>
          <line x1="100" y1="160" x2="100" y2="170" stroke="#667eea" strokeWidth="2"/>

          {/* Ground */}
          <line x1="80" y1="170" x2="120" y2="170" stroke="#667eea" strokeWidth="2"/>
          <line x1="85" y1="175" x2="115" y2="175" stroke="#667eea" strokeWidth="1.5"/>
          <line x1="90" y1="180" x2="110" y2="180" stroke="#667eea" strokeWidth="1"/>
        </svg>
      </div>

      <div className="formula-display">
        <strong>Formula:</strong> Vout = Vin × (R2 / (R1 + R2))
      </div>

      <div className="solve-for-section">
        <label>Solve for:</label>
        <div className="solve-options">
          <button
            className={`solve-btn ${solveFor === 'vout' ? 'active' : ''}`}
            onClick={() => setSolveFor('vout')}
          >Vout</button>
          <button
            className={`solve-btn ${solveFor === 'vin' ? 'active' : ''}`}
            onClick={() => setSolveFor('vin')}
          >Vin</button>
          <button
            className={`solve-btn ${solveFor === 'r1' ? 'active' : ''}`}
            onClick={() => setSolveFor('r1')}
          >R1</button>
          <button
            className={`solve-btn ${solveFor === 'r2' ? 'active' : ''}`}
            onClick={() => setSolveFor('r2')}
          >R2</button>
        </div>
      </div>

      <div className="calculator-inputs">
        {solveFor !== 'vin' && (
          <div className="input-group">
            <label>Input Voltage (Vin)</label>
            <div className="input-with-unit">
              <input
                type="number"
                value={vin}
                onChange={(e) => setVin(e.target.value)}
                placeholder="Enter voltage"
              />
              <span className="unit">V</span>
            </div>
          </div>
        )}

        {solveFor !== 'r1' && (
          <div className="input-group">
            <label>Resistor 1 (R1)</label>
            <div className="input-with-unit">
              <input
                type="number"
                value={r1}
                onChange={(e) => setR1(e.target.value)}
                placeholder="Enter resistance"
              />
              <span className="unit">Ω</span>
            </div>
          </div>
        )}

        {solveFor !== 'r2' && (
          <div className="input-group">
            <label>Resistor 2 (R2)</label>
            <div className="input-with-unit">
              <input
                type="number"
                value={r2}
                onChange={(e) => setR2(e.target.value)}
                placeholder="Enter resistance"
              />
              <span className="unit">Ω</span>
            </div>
          </div>
        )}

        {solveFor !== 'vout' && (
          <div className="input-group">
            <label>Output Voltage (Vout)</label>
            <div className="input-with-unit">
              <input
                type="number"
                value={vout}
                onChange={(e) => setVout(e.target.value)}
                placeholder="Enter voltage"
              />
              <span className="unit">V</span>
            </div>
          </div>
        )}
      </div>

      <div className="calculator-buttons">
        <button className="calculate-btn" onClick={calculate}>Calculate</button>
        <button className="reset-btn" onClick={resetCalculator}>Reset</button>
      </div>

      {error && <div className="calculator-error">{error}</div>}

      {result && (
        <div className="calculator-result">
          <div className="result-label">{result.label}</div>
          <div className="result-value">{result.value} <span>{result.unit}</span></div>
        </div>
      )}
    </div>
  )
}

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  const product = demoProducts.find(p => p.id === parseInt(id))

  if (!product) {
    return (
      <div className="product-detail-container">
        <div className="not-found">
          <h2>Product Not Found</h2>
          <button className="back-btn" onClick={() => navigate('/ittalk')}>
            Back to Products
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="product-detail-container">
      <button className="back-btn" onClick={() => navigate('/ittalk')}>
        &larr; Back to Products
      </button>

      <div className="product-detail-content">
        <div className="product-detail-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-detail-info">
          <h1>{product.name}</h1>
          <p className="product-full-description">{product.fullDescription}</p>

          <div className="product-features">
            <h3>Key Features</h3>
            <ul>
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="product-specifications">
            <h3>Specifications</h3>
            <table>
              <tbody>
                {Object.entries(product.specifications).map(([key, value]) => (
                  <tr key={key}>
                    <td className="spec-key">{key}</td>
                    <td className="spec-value">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="product-actions">
            <button className="contact-btn">Contact for Quote</button>
            <button className="download-btn">Download Datasheet</button>
          </div>
        </div>
      </div>

      {/* Show Calculator if product has one */}
      {product.hasCalculator && (
        <div className="calculator-section">
          <VoltageDividerCalculator />
        </div>
      )}
    </div>
  )
}
