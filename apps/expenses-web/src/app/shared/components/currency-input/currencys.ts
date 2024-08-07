export interface Currency {
  currency: string;
  code: string;
}

// Excerpt from https://www.six-group.com/en/products-services/financial-information/data-standards.html
export const currencies: Currency[] = [
  { currency: 'Afghani', code: 'AFN' },
  { currency: 'Euro', code: 'EUR' },
  { currency: 'Lek', code: 'ALL' },
  { currency: 'Algerian Dinar', code: 'DZD' },
  { currency: 'US Dollar', code: 'USD' },
  { currency: 'Kwanza', code: 'AOA' },
  { currency: 'East Caribbean Dollar', code: 'XCD' },
  { currency: 'Argentine Peso', code: 'ARS' },
  { currency: 'Armenian Dram', code: 'AMD' },
  { currency: 'Aruban Florin', code: 'AWG' },
  { currency: 'Australian Dollar', code: 'AUD' },
  { currency: 'Azerbaijan Manat', code: 'AZN' },
  { currency: 'Bahamian Dollar', code: 'BSD' },
  { currency: 'Bahraini Dinar', code: 'BHD' },
  { currency: 'Taka', code: 'BDT' },
  { currency: 'Barbados Dollar', code: 'BBD' },
  { currency: 'Belarusian Ruble', code: 'BYN' },
  { currency: 'Belize Dollar', code: 'BZD' },
  { currency: 'CFA Franc BCEAO', code: 'XOF' },
  { currency: 'Bermudian Dollar', code: 'BMD' },
  { currency: 'Indian Rupee', code: 'INR' },
  { currency: 'Ngultrum', code: 'BTN' },
  { currency: 'Boliviano', code: 'BOB' },
  { currency: 'Mvdol', code: 'BOV' },
  { currency: 'Convertible Mark', code: 'BAM' },
  { currency: 'Pula', code: 'BWP' },
  { currency: 'Norwegian Krone', code: 'NOK' },
  { currency: 'Brazilian Real', code: 'BRL' },
  { currency: 'Brunei Dollar', code: 'BND' },
  { currency: 'Bulgarian Lev', code: 'BGN' },
  { currency: 'Burundi Franc', code: 'BIF' },
  { currency: 'Cabo Verde Escudo', code: 'CVE' },
  { currency: 'Riel', code: 'KHR' },
  { currency: 'CFA Franc BEAC', code: 'XAF' },
  { currency: 'Canadian Dollar', code: 'CAD' },
  { currency: 'Cayman Islands Dollar', code: 'KYD' },
  { currency: 'Chilean Peso', code: 'CLP' },
  { currency: 'Unidad de Fomento', code: 'CLF' },
  { currency: 'Yuan Renminbi', code: 'CNY' },
  { currency: 'Colombian Peso', code: 'COP' },
  { currency: 'Unidad de Valor Real', code: 'COU' },
  { currency: 'Comorian Franc ', code: 'KMF' },
  { currency: 'Congolese Franc', code: 'CDF' },
  { currency: 'New Zealand Dollar', code: 'NZD' },
  { currency: 'Costa Rican Colon', code: 'CRC' },
  { currency: 'Cuban Peso', code: 'CUP' },
  { currency: 'Peso Convertible', code: 'CUC' },
  { currency: 'Netherlands Antillean Guilder', code: 'ANG' },
  { currency: 'Czech Koruna', code: 'CZK' },
  { currency: 'Danish Krone', code: 'DKK' },
  { currency: 'Djibouti Franc', code: 'DJF' },
  { currency: 'Dominican Peso', code: 'DOP' },
  { currency: 'Egyptian Pound', code: 'EGP' },
  { currency: 'El Salvador Colon', code: 'SVC' },
  { currency: 'Nakfa', code: 'ERN' },
  { currency: 'Lilangeni', code: 'SZL' },
  { currency: 'Ethiopian Birr', code: 'ETB' },
  { currency: 'Falkland Islands Pound', code: 'FKP' },
  { currency: 'Fiji Dollar', code: 'FJD' },
  { currency: 'CFP Franc', code: 'XPF' },
  { currency: 'Dalasi', code: 'GMD' },
  { currency: 'Lari', code: 'GEL' },
  { currency: 'Ghana Cedi', code: 'GHS' },
  { currency: 'Gibraltar Pound', code: 'GIP' },
  { currency: 'Quetzal', code: 'GTQ' },
  { currency: 'Pound Sterling', code: 'GBP' },
  { currency: 'Guinean Franc', code: 'GNF' },
  { currency: 'Guyana Dollar', code: 'GYD' },
  { currency: 'Gourde', code: 'HTG' },
  { currency: 'Lempira', code: 'HNL' },
  { currency: 'Hong Kong Dollar', code: 'HKD' },
  { currency: 'Forint', code: 'HUF' },
  { currency: 'Iceland Krona', code: 'ISK' },
  { currency: 'Rupiah', code: 'IDR' },
  { currency: 'SDR (Special Drawing Right)', code: 'XDR' },
  { currency: 'Iranian Rial', code: 'IRR' },
  { currency: 'Iraqi Dinar', code: 'IQD' },
  { currency: 'New Israeli Sheqel', code: 'ILS' },
  { currency: 'Jamaican Dollar', code: 'JMD' },
  { currency: 'Yen', code: 'JPY' },
  { currency: 'Jordanian Dinar', code: 'JOD' },
  { currency: 'Tenge', code: 'KZT' },
  { currency: 'Kenyan Shilling', code: 'KES' },
  { currency: 'North Korean Won', code: 'KPW' },
  { currency: 'Won', code: 'KRW' },
  { currency: 'Kuwaiti Dinar', code: 'KWD' },
  { currency: 'Som', code: 'KGS' },
  { currency: 'Lao Kip', code: 'LAK' },
  { currency: 'Lebanese Pound', code: 'LBP' },
  { currency: 'Loti', code: 'LSL' },
  { currency: 'Rand', code: 'ZAR' },
  { currency: 'Liberian Dollar', code: 'LRD' },
  { currency: 'Libyan Dinar', code: 'LYD' },
  { currency: 'Swiss Franc', code: 'CHF' },
  { currency: 'Pataca', code: 'MOP' },
  { currency: 'Denar', code: 'MKD' },
  { currency: 'Malagasy Ariary', code: 'MGA' },
  { currency: 'Malawi Kwacha', code: 'MWK' },
  { currency: 'Malaysian Ringgit', code: 'MYR' },
  { currency: 'Rufiyaa', code: 'MVR' },
  { currency: 'Ouguiya', code: 'MRU' },
  { currency: 'Mauritius Rupee', code: 'MUR' },
  { currency: 'ADB Unit of Account', code: 'XUA' },
  { currency: 'Mexican Peso', code: 'MXN' },
  { currency: 'Mexican Unidad de Inversion (UDI)', code: 'MXV' },
  { currency: 'Moldovan Leu', code: 'MDL' },
  { currency: 'Tugrik', code: 'MNT' },
  { currency: 'Moroccan Dirham', code: 'MAD' },
  { currency: 'Mozambique Metical', code: 'MZN' },
  { currency: 'Kyat', code: 'MMK' },
  { currency: 'Namibia Dollar', code: 'NAD' },
  { currency: 'Nepalese Rupee', code: 'NPR' },
  { currency: 'Cordoba Oro', code: 'NIO' },
  { currency: 'Naira', code: 'NGN' },
  { currency: 'Rial Omani', code: 'OMR' },
  { currency: 'Pakistan Rupee', code: 'PKR' },
  { currency: 'Balboa', code: 'PAB' },
  { currency: 'Kina', code: 'PGK' },
  { currency: 'Guarani', code: 'PYG' },
  { currency: 'Sol', code: 'PEN' },
  { currency: 'Philippine Peso', code: 'PHP' },
  { currency: 'Zloty', code: 'PLN' },
  { currency: 'Qatari Rial', code: 'QAR' },
  { currency: 'Romanian Leu', code: 'RON' },
  { currency: 'Russian Ruble', code: 'RUB' },
  { currency: 'Rwanda Franc', code: 'RWF' },
  { currency: 'Saint Helena Pound', code: 'SHP' },
  { currency: 'Tala', code: 'WST' },
  { currency: 'Dobra', code: 'STN' },
  { currency: 'Saudi Riyal', code: 'SAR' },
  { currency: 'Serbian Dinar', code: 'RSD' },
  { currency: 'Seychelles Rupee', code: 'SCR' },
  { currency: 'Leone', code: 'SLE' },
  { currency: 'Singapore Dollar', code: 'SGD' },
  { currency: 'Sucre', code: 'XSU' },
  { currency: 'Solomon Islands Dollar', code: 'SBD' },
  { currency: 'Somali Shilling', code: 'SOS' },
  { currency: 'South Sudanese Pound', code: 'SSP' },
  { currency: 'Sri Lanka Rupee', code: 'LKR' },
  { currency: 'Sudanese Pound', code: 'SDG' },
  { currency: 'Surinam Dollar', code: 'SRD' },
  { currency: 'Swedish Krona', code: 'SEK' },
  { currency: 'WIR Euro', code: 'CHE' },
  { currency: 'WIR Franc', code: 'CHW' },
  { currency: 'Syrian Pound', code: 'SYP' },
  { currency: 'New Taiwan Dollar', code: 'TWD' },
  { currency: 'Somoni', code: 'TJS' },
  { currency: 'Tanzanian Shilling', code: 'TZS' },
  { currency: 'Baht', code: 'THB' },
  { currency: 'Pa’anga', code: 'TOP' },
  { currency: 'Trinidad and Tobago Dollar', code: 'TTD' },
  { currency: 'Tunisian Dinar', code: 'TND' },
  { currency: 'Turkish Lira', code: 'TRY' },
  { currency: 'Turkmenistan New Manat', code: 'TMT' },
  { currency: 'Uganda Shilling', code: 'UGX' },
  { currency: 'Hryvnia', code: 'UAH' },
  { currency: 'UAE Dirham', code: 'AED' },
  { currency: 'Peso Uruguayo', code: 'UYU' },
  { currency: 'Uruguay Peso en Unidades Indexadas (UI)', code: 'UYI' },
  { currency: 'Unidad Previsional', code: 'UYW' },
  { currency: 'Uzbekistan Sum', code: 'UZS' },
  { currency: 'Vatu', code: 'VUV' },
  { currency: 'Bolívar Soberano', code: 'VES' },
  { currency: 'Dong', code: 'VND' },
  { currency: 'Yemeni Rial', code: 'YER' },
  { currency: 'Zambian Kwacha', code: 'ZMW' },
  { currency: 'Zimbabwe Dollar', code: 'ZWL' },
  { currency: 'Zimbabwe Gold', code: 'ZWG' },
];
