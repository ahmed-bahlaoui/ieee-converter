use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct IEEEResult {
    sign: String,
    exponent: String,
    mantissa: String,
    hex: String,
    full_binary: String,
}
#[wasm_bindgen]
impl IEEEResult {
    // We need public getters for Svelte to access these fields
    #[wasm_bindgen(getter)]
    pub fn sign(&self) -> String { self.sign.clone() }
    
    #[wasm_bindgen(getter)]
    pub fn exponent(&self) -> String { self.exponent.clone() }
    
    #[wasm_bindgen(getter)]
    pub fn mantissa(&self) -> String { self.mantissa.clone() }
    
    #[wasm_bindgen(getter)]
    pub fn hex(&self) -> String { self.hex.clone() }

    #[wasm_bindgen(getter)]
    pub fn full_binary(&self) -> String { self.full_binary.clone() }
}

#[wasm_bindgen]
pub fn convert_f32(input: f32) -> IEEEResult {
    let bits = input.to_bits();
    let sign = (bits >> 31) & 1;
    let exponent = (bits >> 23) & 0xff;
    let mantissa = bits & 0x7fffff;

    IEEEResult {
        sign: format!("{}", sign),
        exponent: format!("{:08b}", exponent),
        mantissa: format!("{:023b}", mantissa),
        hex: format!("0x{:08X}", bits),
        full_binary: format!("{:032b}", bits),
    }
}

#[wasm_bindgen]
pub fn convert_f64(input: f64) -> IEEEResult {
    let bits = input.to_bits();
    let sign = (bits >> 63) & 1;
    let exponent = (bits >> 52) & 0x7ff;
    let mantissa = bits & 0xfffffffffffff;

    IEEEResult {
        sign: format!("{}", sign),
        exponent: format!("{:011b}", exponent),
        mantissa: format!("{:052b}", mantissa),
        hex: format!("0x{:016X}", bits),
        full_binary: format!("{:064b}", bits),
    }
}




#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        let result = add(2, 2);
        assert_eq!(result, 4);
    }
}
