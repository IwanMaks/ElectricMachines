export const Pnom = +(Math.random() * (78.0 - 60.0) + 60.0).toFixed(2)
export const Unom = 220
export const Inom = +(Pnom / Unom).toFixed(2)
export const R1 = Math.random() * (50.0 - 30.0) + 30.0
export const X1 = Math.random() * (80.0 - 50.0) + 50.0
export const Rm = Math.random() * (1700.0 - 1300.0) + 1300.0
export const Xm = Math.random() * (5000.0 - 4000.0) + 4000.0

export const Rhh = +Rm.toFixed(2) + +R1.toFixed(2)
export const Xhh = +Xm.toFixed(2) + +X1.toFixed(2)
export const Rkz = +2*R1.toFixed(2)
export const Xkz = +2*X1.toFixed(2)

export const Zhh = +Math.sqrt(Rhh*Rhh + Xhh*Xhh).toFixed(2)
export const Zkz = +Math.sqrt(Rkz*Rkz + Xkz*Xkz).toFixed(2)

export const k = +(Math.random() * (0.7 - 0.5) + 0.5).toFixed(2)

export const cosPhi = +(Math.random() * (0.9 - 0.8) + 0.8).toFixed(1)
export const cos2 = ((Rkz * (Inom * Inom)) / (Inom * Inom * Zkz))
export const sin1 = Math.sqrt(1 - cosPhi*cosPhi)
export const sin2 = Math.sqrt(1 - cos2*cos2)

export const U2 = (Unom * k)
export const deltaU2 = (Inom * Zkz)*(cosPhi*cos2 + sin1*sin2)/((((Inom / (k + 0.02)) / Inom)+(Unom / (Unom * k)))/2)
export const U2_ans = U2 - deltaU2