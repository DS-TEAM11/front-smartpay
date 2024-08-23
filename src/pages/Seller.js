const Seller = () => {
    return (
        <div className="seller">
            판매자 페이지 입니다
            <form>
                업종 :
                <select name="langua    ges" id="lang">
                    <option value="javascript">JavaScript</option>
                    <option value="php">PHP</option>
                    <option value="java">Java</option>
                    <option value="golang">Golang</option>
                    <option value="python">Python</option>
                    <option value="c#">C#</option>
                    <option value="C++">C++</option>
                    <option value="erlang">Erlang</option>
                </select>
                <br />
                상호명 :
                <select name="langua    ges" id="lang">
                    <option value="javascript">JavaScript</option>
                    <option value="php">PHP</option>
                    <option value="java">Java</option>
                    <option value="golang">Golang</option>
                    <option value="python">Python</option>
                    <option value="c#">C#</option>
                    <option value="C++">C++</option>
                    <option value="erlang">Erlang</option>
                </select>{' '}
                <br />
                가격 :
                <input type="text" />
                <br />
                상품명 :
                <input type="text" />
                <br />
                총합계 :
                <input type="text" />
                <br />
                <input type="hidden" name="email" value="" />
                <button>결제 요청</button>
            </form>
        </div>
    );
};

export default Seller;
